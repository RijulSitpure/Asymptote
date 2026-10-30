import random

def generate():
    inserts = [
        "INSERT INTO Employees VALUES (9, 'Hercy', NULL, 43);",
        "INSERT INTO Employees VALUES (6, 'Alice', 9, 41);",
        "INSERT INTO Employees VALUES (4, 'Bob', 9, 36);",
        "INSERT INTO Employees VALUES (2, 'Winston', NULL, 37);"
    ]
    return "\n".join(inserts)

if __name__ == "__main__":
    print(generate())
