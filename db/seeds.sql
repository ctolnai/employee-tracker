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
        ("Sales Rep", 60000, 2),
        ("VP of Sales", 80000, 2),
        ("Drafter", 40000, 3),
        ("Mechanical Engineer", 60000, 3),
        ("Electrical Engineer", 70000, 3),
        ("HR Rep", 37000, 4),
        ("HR Manager", 65000, 4),
        ("Shipping Clerk", 40000, 5),
        ("Buyer", 55000, 6),
        ("Purchasing Manager", 70000, 6);

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ("Will", "Smith", 1),
        ("Austin", "Barnes", 2),
        ("Clayton", "Kershaw", 3),
        ("Walker", "Buehler", 4),
        ("Max", "Muncy", 5),
        ("Albert", "Pujols", 5),
        ("Trea", "Turner", 6),
        ("Corey", "Seager", 7),
        ("Justin", "Turner", 8),
        ("Gavin", "Lux", 9),
        ("Cody", "Bellinger", 10),
        ("Mookie", "Betts", 11),
        ("Chris", "Taylor", 12);
