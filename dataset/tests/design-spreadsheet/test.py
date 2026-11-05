class Spreadsheet:
    def __init__(self, rows: int):
        self.rows = rows
        self.grid = {}

    def setCell(self, cell: str, value: int) -> None:
        self.grid[cell] = value

    def resetCell(self, cell: str) -> None:
        if cell in self.grid:
            del self.grid[cell]

    def getValue(self, formula: str) -> int:
        expr = formula[1:]
        parts = expr.split('+')
        total = 0
        for p in parts:
            if p[0].isalpha():
                total += self.grid.get(p, 0)
            else:
                total += int(p)
        return total

def test_design_spreadsheet():
    sheet = Spreadsheet(10)
    sheet.setCell("A1", 10)
    sheet.setCell("B1", 20)
    assert sheet.getValue("=A1+B1") == 30
    assert sheet.getValue("=A1+5") == 15
    sheet.resetCell("A1")
    assert sheet.getValue("=A1+B1") == 20

if __name__ == '__main__':
    test_design_spreadsheet()
    print('All tests passed.')
