create table [dbo].[tbl_gift_submission](
	id int IDENTITY(1,1) not null,
	gift_category_id int not null FOREIGN KEY REFERENCES tbl_gift_category(id),
	gift_type varchar(255) not null,
	business_purpose varchar(max),
	receipt_image varchar(max),
	requestor_email varchar(255) not null,
	gift_description varchar(max),
	vendor_name varchar(255) not null,
	remarks varchar(max),
	gift_amount float not null,
	is_vendor_government_official tinyint not null DEFAULT 0,
	internal_higher_position_name varchar(255),
	is_rejected tinyint not null default 0,
	rejection_reason varchar(max),
	CONSTRAINT pk_tbl_gift_submission_id PRIMARY KEY CLUSTERED(id)
);


ALTER TABLE tbl_gift_submission ADD rejected_by varchar(255) NULL;
ALTER TABLE tbl_gift_submission ADD is_approved tinyint not null default 0;
ALTER TABLE tbl_gift_submission ADD created_at datetime not null default GETDATE();
ALTER TABLE tbl_gift_submission ADD intended_requestor_name varchar(255);
ALTER TABLE tbl_gift_submission ADD intended_requestor_email varchar(255);
ALTER TABLE tbl_gift_submission ADD gift_acceptance_type varchar(255);