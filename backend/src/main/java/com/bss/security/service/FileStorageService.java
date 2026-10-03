package com.bss.security.service;

import com.bss.security.exception.BadRequestException;
import com.bss.security.exception.FileStorageException;
import com.bss.security.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class FileStorageService {

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList(".pdf", ".doc", ".docx");

    private final Path uploadLocation;

    public FileStorageService(@Value("${app.upload.resume-dir:uploads/resumes}") String resumeUploadDir) {
        this.uploadLocation = Paths.get(resumeUploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.uploadLocation);
        } catch (IOException ex) {
            throw new FileStorageException("Could not initialize resume upload storage directory", ex);
        }
    }

    public String storeResume(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Resume file is required");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new BadRequestException("File size exceeds the maximum allowed limit of 5MB");
        }

        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename() != null ? file.getOriginalFilename() : "");
        if (originalFilename.contains("..")) {
            throw new BadRequestException("Invalid filename containing path traversal sequence");
        }

        int lastDotIndex = originalFilename.lastIndexOf(".");
        if (lastDotIndex == -1) {
            throw new BadRequestException("Resume file must have a valid extension (.pdf, .doc, .docx)");
        }

        String extension = originalFilename.substring(lastDotIndex).toLowerCase();
        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new BadRequestException("Invalid file type: " + extension + ". Only PDF, DOC, and DOCX files are allowed");
        }

        // Validate content type & magic bytes (file signature)
        validateFileSignature(file, extension);

        // Store file with a randomized UUID filename
        String storedFileName = UUID.randomUUID().toString() + extension;
        Path targetLocation = this.uploadLocation.resolve(storedFileName).normalize();

        try {
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return storedFileName;
        } catch (IOException ex) {
            throw new FileStorageException("Failed to store resume file", ex);
        }
    }

    public Resource loadResumeAsResource(String storedFileName) {
        if (storedFileName == null || storedFileName.trim().isEmpty() || storedFileName.contains("..")) {
            throw new BadRequestException("Invalid resume reference");
        }

        try {
            Path filePath = this.uploadLocation.resolve(storedFileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                throw new ResourceNotFoundException("Resume file not found on disk");
            }
        } catch (MalformedURLException ex) {
            throw new ResourceNotFoundException("Resume file not found: " + ex.getMessage());
        }
    }

    private void validateFileSignature(MultipartFile file, String extension) {
        byte[] header = new byte[8];
        try (InputStream inputStream = file.getInputStream()) {
            int bytesRead = inputStream.read(header);
            if (bytesRead < 4) {
                throw new BadRequestException("Corrupted or empty file provided");
            }

            // Check for executable signatures (MZ for Windows PE/EXE, ELF for Linux)
            if (header[0] == 0x4D && header[1] == 0x5A) { // 'MZ'
                throw new BadRequestException("Executable files (.exe) are strictly prohibited");
            }
            if (header[0] == 0x7F && header[1] == 0x45 && header[2] == 0x4C && header[3] == 0x46) { // ELF
                throw new BadRequestException("Executable binary files are strictly prohibited");
            }

            if (".pdf".equals(extension)) {
                // PDF magic bytes: %PDF- (0x25, 0x50, 0x44, 0x46)
                if (header[0] != 0x25 || header[1] != 0x50 || header[2] != 0x44 || header[3] != 0x46) {
                    throw new BadRequestException("File content does not match a valid PDF format");
                }
            } else if (".docx".equals(extension)) {
                // DOCX is a ZIP container: PK.. (0x50, 0x4B, 0x03, 0x04)
                if (header[0] != 0x50 || header[1] != 0x4B || header[2] != 0x03 || header[3] != 0x04) {
                    throw new BadRequestException("File content does not match a valid DOCX document");
                }
            } else if (".doc".equals(extension)) {
                // DOC OLE CFB header: 0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1
                if ((header[0] & 0xFF) != 0xD0 || (header[1] & 0xFF) != 0xCF || (header[2] & 0xFF) != 0x11 || (header[3] & 0xFF) != 0xE0) {
                    throw new BadRequestException("File content does not match a valid DOC document");
                }
            }
        } catch (IOException ex) {
            throw new BadRequestException("Could not read file for validation: " + ex.getMessage());
        }
    }
}
