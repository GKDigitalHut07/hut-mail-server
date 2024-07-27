package com.hut.emailserver.model;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class EmailData {
	
	@NotEmpty
	private String[] emailTo;
	private String emailFrom;
	private String[] cc;
	private String[] bcc;
	@NotBlank
	private String subject;
	private String body;
	private boolean isHtml;
	private List<Attachment> attachments;

}
