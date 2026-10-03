package com.bss.security.service;

import com.bss.security.dto.request.LoginRequest;
import com.bss.security.dto.request.RegisterRequest;
import com.bss.security.dto.response.AuthResponse;
import com.bss.security.dto.response.UserResponse;
import com.bss.security.entity.LoginActivity;
import com.bss.security.entity.LoginStatus;
import com.bss.security.entity.Role;
import com.bss.security.entity.User;
import com.bss.security.exception.DuplicateResourceException;
import com.bss.security.exception.ResourceNotFoundException;
import com.bss.security.repository.LoginActivityRepository;
import com.bss.security.repository.UserRepository;
import com.bss.security.security.JwtTokenProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final LoginActivityRepository loginActivityRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthService(UserRepository userRepository,
                       LoginActivityRepository loginActivityRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.loginActivityRepository = loginActivityRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    @Transactional
    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail().trim().toLowerCase())) {
            throw new DuplicateResourceException("An account with email " + request.getEmail() + " already exists");
        }

        // New public registrations ALWAYS receive ROLE_APPLICANT
        User user = new User(
                request.getFullName().trim(),
                request.getEmail().trim().toLowerCase(),
                request.getPhone().trim(),
                passwordEncoder.encode(request.getPassword()),
                Role.APPLICANT
        );

        User savedUser = userRepository.save(user);
        return UserResponse.fromEntity(savedUser);
    }

    @Transactional(noRollbackFor = BadCredentialsException.class)
    public AuthResponse login(LoginRequest request, String userAgent, String ipAddress) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();

        User user = userRepository.findByEmail(normalizedEmail)
                .orElse(null);

        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            // Log failed login event without saving password
            loginActivityRepository.saveAndFlush(new LoginActivity(
                    user,
                    normalizedEmail,
                    LoginStatus.FAILED,
                    userAgent,
                    ipAddress
            ));
            throw new BadCredentialsException("Invalid email or password");
        }

        if (!user.isEnabled()) {
            throw new BadCredentialsException("Account is disabled. Please contact administration.");
        }

        // Log successful login event
        loginActivityRepository.save(new LoginActivity(
                user,
                normalizedEmail,
                LoginStatus.SUCCESS,
                userAgent,
                ipAddress
        ));

        String token = tokenProvider.generateTokenFromUser(user);

        return new AuthResponse(
                token,
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole()
        );
    }

    @Transactional(readOnly = true)
    public UserResponse getCurrentUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return UserResponse.fromEntity(user);
    }
}
