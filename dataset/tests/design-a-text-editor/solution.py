class TextEditor:
    def __init__(self):
        self.left = []
        self.right = []

    def addText(self, text: str) -> None:
        for ch in text:
            self.left.append(ch)

    def deleteText(self, k: int) -> int:
        cnt = min(k, len(self.left))
        for _ in range(cnt):
            self.left.pop()
        return cnt

    def cursorLeft(self, k: int) -> str:
        cnt = min(k, len(self.left))
        for _ in range(cnt):
            self.right.append(self.left.pop())
        return "".join(self.left[-10:])

    def cursorRight(self, k: int) -> str:
        cnt = min(k, len(self.right))
        for _ in range(cnt):
            self.left.append(self.right.pop())
        return "".join(self.left[-10:])
