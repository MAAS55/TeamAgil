-- Create the database if it does not already exist
IF DB_ID('EventManagementDB') IS NULL
BEGIN
CREATE DATABASE EventManagementDB;
END;
GO

USE EventManagementDB;
GO
