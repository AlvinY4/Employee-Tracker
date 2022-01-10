USE employee_tracker; 

INSERT INTO department (department_name) 
VALUES 
('Sales'),
('Engineering'),
('Information Technology'), 
('Finance'),
('Managment'),
('Human Reasources'),
('Legal');  

INSERT INTO role (title, salary, department_id)
VALUES 
('Sales Representative', 75000, 1),
('Engineer', 110000, 2),
('Software Engineer', 100000, 3),
('Account Manager', 95000, 4), 
('Manager', 120000, 5),
('Office Assistant', 70000, 6),
('Lawyer', 200000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('John', 'Roberts', 1, 120),
('Liam', 'Wentworth', 2, 130),
('Heather', 'Adams', 3, 140),
('Judith', 'Williams', 4, 150),
('Kyle', 'Clark', 5, 160),
('Andrew', 'Johnson', 6, 170),
('Ethan', 'Harris', 7, 180); 