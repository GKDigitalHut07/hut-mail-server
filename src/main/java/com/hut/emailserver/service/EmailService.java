package com.hut.emailserver.service;

import java.io.ByteArrayInputStream;
import java.util.Base64;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import com.hut.emailserver.model.EmailData;
import com.hut.emailserver.service.model.EmailResponse;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

	private final JavaMailSender javaMailSender;

	public EmailResponse sendEmail(EmailData data) {
		EmailResponse response = new EmailResponse();
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper mimeMessageHelper;
		try {
			mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

			if (!ObjectUtils.isEmpty(data)) {
				if (data.getEmailTo() != null && data.getEmailTo().length > 0) {
					mimeMessageHelper.setTo(data.getEmailTo());
				}
				if (data.getBcc() != null && data.getBcc().length > 0) {
					mimeMessageHelper.setBcc(data.getBcc());
				}
				if (data.getCc() != null && data.getCc().length > 0) {
					mimeMessageHelper.setCc(data.getCc());
				}
				if (data.getBody() != null) {
					mimeMessageHelper.setText(data.getBody(), data.isHtml());
				}
				if (data.getSubject() != null) {
					mimeMessageHelper.setSubject(data.getSubject());
				}
				if (!CollectionUtils.isEmpty(data.getAttachments())) {
					data.getAttachments().forEach(att -> {
						try {
							byte[] bytes = Base64.getDecoder().decode(att.getEncodedBytes());
							mimeMessageHelper.addAttachment(att.getFileName(), () -> new ByteArrayInputStream(bytes));
						} catch (MessagingException e) {
							e.printStackTrace();
						}

					});
				}
				javaMailSender.send(mimeMessage);
				response.setMessage("Email sent successfully");

			}
		} catch (MessagingException e1) {
			response.setMessage("Internal server error, please contact system administrator or try after sometimes"); 
		} catch (Exception ex) {
			response.setMessage("Error occured due to : "+ex.getMessage());
			response.setErrorDescription(ex.getStackTrace().toString());
		}
		return response;

	}

}
