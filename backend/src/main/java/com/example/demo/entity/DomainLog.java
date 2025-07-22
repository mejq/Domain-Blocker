package com.example.demo.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "domain_action_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Indexed
public class DomainLog {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID",strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id",updatable = false,nullable = false)
    private  UUID id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY) //lazy -> sadece ihtiyaç anında yukle
    @JoinColumn(name = "blocked_domain_id",referencedColumnName = "id")
    private BlockedDomain blockedDomain;

    @Column(name = "domain_name",nullable = false)
    private String domainName;

    @Column(name = "action_type",nullable = false)
    private String actionType;

    @Column(name = "status", nullable = false)
    private String status; // "SUCCESS", "FAILED" gibi

    @Column(name = "message", columnDefinition = "TEXT")
    private String message; // "SSH bağlantı hatası", "Domain başarıyla engellendi"

    @Column(name = "action_at", nullable = false)
    private LocalDateTime actionAt;

    @Column(name = "acted_by")
    private String actedBy;

    public DomainLog(BlockedDomain blockedDomain, String domainName, String actionType, String status, String message, String actedBy) {
        this.blockedDomain = blockedDomain;
        this.domainName = domainName;
        this.actionType = actionType;
        this.status = status;
        this.message = message;
        this.actionAt = LocalDateTime.now();
        this.actedBy = actedBy;
    }
}