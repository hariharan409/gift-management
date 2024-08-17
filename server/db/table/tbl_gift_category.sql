create table [dbo].[tbl_gift_category](
	id int IDENTITY(1,1) NOT NULL,
	name varchar(255) NOT NULL UNIQUE,
	CONSTRAINT pk_tbl_gift_category_id PRIMARY KEY CLUSTERED(id)
);

  insert into tbl_gift_category(name) values('gift');
  insert into tbl_gift_category(name) values('travel-gift');
  insert into tbl_gift_category(name) values('business-entertainment');
  insert into tbl_gift_category(name) values('travel-business-entertainment');