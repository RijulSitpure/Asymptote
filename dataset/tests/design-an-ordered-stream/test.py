class OrderedStream:
    def __init__(self, n: int):
        self.stream = [None] * (n + 2)
        self.ptr = 1

    def insert(self, idKey: int, value: str) -> list[str]:
        self.stream[idKey] = value
        res = []
        while self.stream[self.ptr] is not None:
            res.append(self.stream[self.ptr])
            self.ptr += 1
        return res

os = OrderedStream(5)
assert os.insert(3, "ccccc") == []
assert os.insert(1, "aaaaa") == ["aaaaa"]
assert os.insert(2, "bbbbb") == ["bbbbb", "ccccc"]
assert os.insert(5, "eeeee") == []
assert os.insert(4, "ddddd") == ["ddddd", "eeeee"]
print("All tests passed successfully.")
