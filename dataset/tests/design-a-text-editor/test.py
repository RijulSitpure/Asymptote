from solution import TextEditor
t = TextEditor()
t.addText("leetcode")
assert t.deleteText(4) == 4
t.addText("practice")
assert t.cursorRight(3) == "etpractice"
assert t.cursorLeft(8) == "leet"
assert t.deleteText(10) == 4
assert t.cursorLeft(2) == ""
assert t.cursorRight(6) == "practi"
print("All tests passed for design-a-text-editor!")
