package com.hut.emailserver.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hut.emailserver.model.EmailData;
import com.hut.emailserver.service.EmailService;
import com.hut.emailserver.service.model.EmailResponse;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

@RestController
@RequestMapping("/v1.0")
@RequiredArgsConstructor
public class EmailController {

	
	private final EmailService emailService;

	@SneakyThrows
	@PostMapping("/sendEmail")
	public EmailResponse sendEmail(@RequestBody EmailData data) {
		return emailService.sendEmail(data);
	}
	
	@RequestMapping(value = "/sendEmail", method = RequestMethod.OPTIONS)
    public ResponseEntity<Void> handleOptionsRequest() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Allow", "POST, OPTIONS"); // Specify allowed methods in response header
        return ResponseEntity.ok().headers(headers).build();
    }

}
