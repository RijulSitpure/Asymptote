from solution import SQL
sql = SQL(["one", "two"], [2, 3])
sql.insertRow("one", ["a", "b"])
sql.insertRow("two", ["c", "d", "e"])
assert sql.selectCell("one", 1, 2) == "b"
assert sql.selectCell("two", 1, 3) == "e"
sql.deleteRow("one", 1)
print("All tests passed for design-sql!")
