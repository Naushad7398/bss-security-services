package org.springframework.core.type.classreading;

import org.springframework.asm.ClassReader;
import org.springframework.core.io.Resource;
import org.springframework.core.type.AnnotationMetadata;
import org.springframework.core.type.ClassMetadata;

import java.io.IOException;
import java.io.InputStream;

final class SimpleMetadataReader implements MetadataReader {

    private static final int PARSING_OPTIONS = ClassReader.SKIP_DEBUG
            | ClassReader.SKIP_CODE
            | ClassReader.SKIP_FRAMES;

    private final Resource resource;
    private final AnnotationMetadata annotationMetadata;

    SimpleMetadataReader(Resource resource, ClassLoader classLoader) throws IOException {
        SimpleAnnotationMetadataReadingVisitor visitor = new SimpleAnnotationMetadataReadingVisitor(classLoader);
        getClassReader(resource).accept(visitor, PARSING_OPTIONS);
        this.resource = resource;
        this.annotationMetadata = visitor.getMetadata();
    }

    private static ClassReader getClassReader(Resource resource) throws IOException {
        try (InputStream is = resource.getInputStream()) {
            byte[] bytes = is.readAllBytes();
            if (bytes.length > 7 && bytes[6] == 0 && (bytes[7] & 0xFF) >= 66) {
                // Compatibility bridge for Java 22+ / 26 bytecode (major version >= 66)
                // Masks the major version to 65 for Spring's internal ASM ClassReader parser
                bytes[7] = 65;
            }
            return new ClassReader(bytes);
        } catch (IllegalArgumentException ex) {
            throw new ClassFormatException("Class format exception in " + resource, ex);
        }
    }

    @Override
    public Resource getResource() {
        return this.resource;
    }

    @Override
    public ClassMetadata getClassMetadata() {
        return this.annotationMetadata;
    }

    @Override
    public AnnotationMetadata getAnnotationMetadata() {
        return this.annotationMetadata;
    }
}
