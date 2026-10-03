package com.bss.security.config;

import com.bss.security.entity.Role;
import com.bss.security.entity.User;
import com.bss.security.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.email:${BSS_ADMIN_EMAIL:}}")
    private String adminEmail;

    @Value("${app.admin.password:${BSS_ADMIN_PASSWORD:}}")
    private String adminPassword;

    @Value("${app.admin.name:${BSS_ADMIN_NAME:BSS Super Admin}}")
    private String adminName;

    @Value("${app.admin.phone:${BSS_ADMIN_PHONE:+91 96641 54689}}")
    private String adminPhone;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (!StringUtils.hasText(adminEmail) || !StringUtils.hasText(adminPassword)) {
            logger.info("Admin seeding skipped: BSS_ADMIN_EMAIL or BSS_ADMIN_PASSWORD not set in environment.");
            return;
        }

        String normalizedEmail = adminEmail.trim().toLowerCase();

        if (userRepository.existsByEmail(normalizedEmail)) {
            logger.info("Admin user already exists with email: {}", normalizedEmail);
            return;
        }

        // Never print or log the plain-text password
        User adminUser = new User(
                StringUtils.hasText(adminName) ? adminName.trim() : "BSS Super Admin",
                normalizedEmail,
                StringUtils.hasText(adminPhone) ? adminPhone.trim() : "+91 96641 54689",
                passwordEncoder.encode(adminPassword),
                Role.ADMIN
        );

        userRepository.save(adminUser);
        logger.info("Initial admin user created successfully with email: {} and role: ROLE_ADMIN", normalizedEmail);
    }
}
