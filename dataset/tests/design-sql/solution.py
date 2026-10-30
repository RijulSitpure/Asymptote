class SQL:
    def __init__(self, names: list[str], columns: list[int]):
        self.tables = {}
        for name in names:
            self.tables[name] = {"next_id": 1, "rows": {}}

    def insertRow(self, name: str, row: list[str]) -> None:
        table = self.tables[name]
        row_id = table["next_id"]
        table["rows"][row_id] = row
        table["next_id"] += 1

    def deleteRow(self, name: str, rowId: int) -> None:
        self.tables[name]["rows"].pop(rowId, None)

    def selectCell(self, name: str, rowId: int, columnId: int) -> str:
        return self.tables[name]["rows"][rowId][columnId - 1]
