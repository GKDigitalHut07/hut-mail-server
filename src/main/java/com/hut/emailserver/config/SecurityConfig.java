package com.hut.emailserver.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Value("${content.security.policies}")
	private String policies;
	@Value("${api.key}")
	private String apiKey;
	
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    	 http.csrf(csrf -> csrf.disable())
	         .authorizeHttpRequests(authorizeRequests -> authorizeRequests
	             .anyRequest().permitAll()  // Allow all requests to this service
	         )
            .addFilterBefore(new ApiKeyFilter(this.apiKey), UsernamePasswordAuthenticationFilter.class)
            .cors(Customizer.withDefaults())
            .headers(headers -> headers
                .contentSecurityPolicy(csp -> csp
                    .policyDirectives("default-src 'self'; script-src 'self' "+policies)
                )
            );

        return http.build();
    }
}



