INSERT INTO department (name)
VALUES  ("Accounting"),
        ("Sales"),
        ("Engineering"),
        ("Human Resources"),
        ("Shipping"),
        ("Purchasing");

INSERT INTO role (title, salary, department_id)
VALUES  ("Accounts Receivable", 50000, 1),
        ("Accounts Payable", 50000, 1),
        ("VP of Sales", 80000, 2),
        ("Outside Sales Rep", 50000, 2),
        ("Engineering Manager", 90000, 3),
        ("Mechanical Engineer", 60000, 3),
        ("Electrical Engineer", 70000, 3),
        ("HR Manager", 65000, 4),
        ("HR Rep", 37000, 4),
        ("Shipping Clerk", 40000, 5),
        ("Purchaser", 70000, 6),
        ("Junior Buyer", 55000, 6);
        

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Will", "Smith", 1, null),
        ("Austin", "Barnes", 2, null),
        ("Clayton", "Kershaw", 3, null),
        ("Walker", "Buehler", 4, 3),
        ("Max", "Muncy", 4, 3),
        ("Albert", "Pujols", 5, null),
        ("Trea", "Turner", 6, 5),
        ("Corey", "Seager", 7, 5),
        ("Justin", "Turner", 8, 8),
        ("Gavin", "Lux", 9, null),
        ("Cody", "Bellinger", 10, null),
        ("Mookie", "Betts", 11, null),
        ("Chris", "Taylor", 12, 11);
