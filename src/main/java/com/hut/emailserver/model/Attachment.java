package com.hut.emailserver.model;

import lombok.Data;

@Data
public class Attachment {
	
	private String fileName;
	private String encodedBytes;
	private String contentType;
	

}
