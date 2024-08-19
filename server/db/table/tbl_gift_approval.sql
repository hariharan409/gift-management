create table [dbo].[tbl_gift_approval](
	id int IDENTITY(1,1) not null,
	gift_id int not null FOREIGN KEY REFERENCES tbl_gift_submission(id),
	approver_email varchar(255) not null,
	approval_sequence int not null,
	is_approved tinyint not null default 0,
	CONSTRAINT pk_tbl_gift_approval_id PRIMARY KEY CLUSTERED(id)
);

ALTER TABLE tbl_gift_approval add approval_required tinyint not null default 0;
ALTER TABLE tbl_gift_approval ADD approved_at datetime;