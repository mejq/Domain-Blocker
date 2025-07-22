package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Setter
@Getter
@Indexed
@Table(name = "blocked_domains")
public class BlockedDomain { // blocked_domains tablosu aslında
// Getter ve Setter // tabloya erişim ekleme cıkartma için gettersetterlar
    //tum fieldları tanımlıyoruz

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @FullTextField(analyzer = "default")
    @Column(name = "domain_name", nullable = false)
    public String domainName;


    @Column(name = "applied_by", nullable = false)
    private String appliedBy;


    @Column(name = "applied_at", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    private LocalDateTime appliedAt;


    @JsonIgnore // domain log içinde de blocked domain referansı var json sonsuz döngü oluyo
    @OneToMany(mappedBy = "blockedDomain", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY) // cascadetpyle.all blocked domain uzerınde yapılanlar loga da yanısr
    private List<DomainLog> actionLogs = new ArrayList<>();

    public BlockedDomain(String domainName, String admin, LocalDateTime now) {
        this.domainName = domainName;
        this.appliedBy = admin;
        this.appliedAt = now;
    }
    public BlockedDomain() {}

    public void addActionLog(DomainLog log) {
        actionLogs.add(log);
        log.setBlockedDomain(this);
    }
}
