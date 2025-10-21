# DomainBlocker
Centralized Domain Blocking System on Remote Linux Servers

This is a full-stack web application designed to manage domain-level content filtering by remotely updating the /etc/hosts file on a target Linux server. It provides system administrators and users with a centralized, secure, and user-friendly platform for controlling network access to specific domains.

Highlights & Key Features

    Secure Remote Access: Uses the JSch library within the Spring Boot backend to establish a secure SSH connection and execute system commands for hosts file modification.

    Intuitive Web Interface: An Angular 19 frontend allows users to easily list, add, and remove domains from the block list.

    Auditable Persistence: All blocking/unblocking actions are recorded in a PostgreSQL database, ensuring full auditability. Liquibase manages database schema changes consistently.

    Fully Containerized: The entire system—Frontend (Angular/Nginx), Backend (Spring Boot), and Database (PostgreSQL)—is deployed via Docker and Docker Compose for guaranteed environment consistency and fast setup.

    Operational Monitoring: Integrated with Spring Actuator for health and performance metrics, supported by centralized request logging and robust Global Exception Handling.

Technology Stack

Component	Key Technologies
Frontend	Angular 19, Reactive Forms
Backend	Spring Boot, JSch (for SSH), REST API
Database	PostgreSQL, Hibernate (JPA), Liquibase
Deployment	Docker, Docker Compose
