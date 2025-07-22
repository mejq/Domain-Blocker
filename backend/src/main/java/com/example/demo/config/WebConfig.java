package com.example.demo.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.example.demo.interceptor.RequestLoggingInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private RequestLoggingInterceptor requestLoggingInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(requestLoggingInterceptor)
                .addPathPatterns("/**");
    }
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/domain-block/**")
                        .allowedOrigins("http://localhost:4200", "http://localhost:4201", "http://localhost:4202")
                        .allowedMethods("GET", "POST", "DELETE", "OPTIONS")
                        .allowCredentials(true);

                registry.addMapping("/api/domain-block")
                        .allowedOrigins("http://localhost:4200", "http://localhost:4201", "http://localhost:4202")
                        .allowedMethods("GET", "POST", "DELETE", "OPTIONS")
                        .allowCredentials(true);
            }
        };
    }
}

