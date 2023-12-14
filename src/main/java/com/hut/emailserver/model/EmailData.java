package com.hut.emailserver.model;

import java.util.List;

import lombok.Data;

@Data
public class EmailData {
	
	private String[] emailTo;
	private String emailFrom;
	private String[] cc;
	private String[] bcc;
	private String subject;
	private String body;
	private boolean isHtml;
	private List<Attachment> attachments;

}
