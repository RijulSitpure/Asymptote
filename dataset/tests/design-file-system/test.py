class FileSystem:
    def __init__(self):
        self.paths = {"": 0}

    def createPath(self, path: str, value: int) -> bool:
        if path in self.paths or path == "" or path == "/":
            return False
        parent = path[:path.rfind("/")]
        if parent not in self.paths:
            return False
        self.paths[path] = value
        return True

    def get(self, path: str) -> int:
        return self.paths.get(path, -1)

fs = FileSystem()
assert fs.createPath("/a", 1) == True
assert fs.get("/a") == 1
assert fs.createPath("/a/b", 2) == True
assert fs.get("/a/b") == 2
assert fs.createPath("/c/d", 3) == False
assert fs.get("/c/d") == -1
print("All tests passed successfully.")
