package com.hut.emailserver.service.model;

import lombok.Data;

@Data
public class EmailResponse {

	private String message;
	private String errorDescription;
	private String errorCode;
}
