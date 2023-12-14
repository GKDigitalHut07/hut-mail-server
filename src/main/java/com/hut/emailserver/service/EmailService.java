package com.hut.emailserver.service;

import java.io.ByteArrayInputStream;
import java.util.Base64;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.hut.emailserver.model.EmailData;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
	
	private final JavaMailSender javaMailSender;
	
	public void sendEmail(EmailData data) throws MessagingException {
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
		mimeMessageHelper.setTo(data.getEmailTo());
		mimeMessageHelper.setSubject(data.getSubject());
		mimeMessageHelper.setText(data.getBody(), data.isHtml());
		data.getAttachments().forEach(att -> {
			try {
				byte[] bytes= Base64.getDecoder().decode(att.getEncodedBytes());
				mimeMessageHelper.addAttachment(att.getFileName(), () -> new ByteArrayInputStream(bytes));
			} catch (MessagingException e) {
				e.printStackTrace();
			}

		});
		javaMailSender.send(mimeMessage);

	}

}
