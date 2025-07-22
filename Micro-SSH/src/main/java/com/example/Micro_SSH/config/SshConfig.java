package com.example.Micro_SSH.config;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Component
public class SshConfig {

    @Value("${ssh.username}")
    private String username;

    @Value("${ssh.host_ip}")
    private String hostIp;

    @Value("${ssh.private_key_path}")
    private String privateKeyPath;

    @Value("${ssh.port}")
    private int port;
}
