package com.alumniportal.alumni.controller;

import com.alumniportal.alumni.dto.ProfileDTO;
import com.alumniportal.alumni.entity.Job;
import com.alumniportal.alumni.entity.User;
import com.alumniportal.alumni.repository.JobRepository;
import com.alumniportal.alumni.repository.UserRepository;
import com.alumniportal.alumni.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/alumni")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AlumniController {

    private final ProfileService profileService;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;

    public AlumniController(ProfileService profileService,
                            UserRepository userRepository,
                            JobRepository jobRepository) {
        this.profileService = profileService;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
    }

    /**
     * Get logged-in alumni profile
     */
    @GetMapping("/profile")
    @PreAuthorize("hasRole('ALUMNI')")
    public ResponseEntity<ProfileDTO> getAlumniProfile(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }

        String email = principal.getName();
        System.out.println("🔄 GET PROFILE REQUEST FOR: " + email);

        ProfileDTO profile = profileService.getProfileByEmail(email);

        if (profile == null) {
            return ResponseEntity.notFound().build();
        }

        System.out.println("✅ GET PROFILE SUCCESS: " + profile.toString());
        return ResponseEntity.ok(profile);
    }

    /**
     * Update logged-in alumni profile
     */
    @PutMapping("/profile")
    @PreAuthorize("hasRole('ALUMNI')")
    public ResponseEntity<ProfileDTO> updateAlumniProfile(@RequestBody ProfileDTO updatedProfile, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }

        String email = principal.getName();
        try {
            System.out.println("🔄 UPDATE PROFILE REQUEST FOR: " + email);
            System.out.println("📝 REQUEST BODY: " + updatedProfile.toString());

            ProfileDTO updated = profileService.updateProfileByEmail(email, updatedProfile);

            System.out.println("✅ UPDATE PROFILE SUCCESS: " + updated.toString());
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            System.out.println("❌ UPDATE PROFILE ERROR: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    /**
     * Get jobs posted by this alumni
     */
    @GetMapping("/jobs")
    @PreAuthorize("hasRole('ALUMNI')")
    public ResponseEntity<List<Job>> getAlumniJobs(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }

        String email = principal.getName();
        User alumni = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Alumni not found"));

        List<Job> jobs = jobRepository.findByPostedBy(alumni);
        return ResponseEntity.ok(jobs);
    }

    /**
     * Post a new job
     */
    @PostMapping("/jobs")
    @PreAuthorize("hasRole('ALUMNI')")
    public ResponseEntity<Job> postJob(@RequestBody Job jobRequest, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }

        String email = principal.getName();
        User alumni = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Alumni not found"));

        jobRequest.setPostedBy(alumni);
        Job savedJob = jobRepository.save(jobRequest);

        return ResponseEntity.ok(savedJob);
    }
}