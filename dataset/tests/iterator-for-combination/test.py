class CombinationIterator:
    def __init__(self, characters: str, combinationLength: int):
        self.combs = []
        self.ptr = 0
        def backtrack(start, curr):
            if len(curr) == combinationLength:
                self.combs.append("".join(curr))
                return
            for i in range(start, len(characters)):
                curr.append(characters[i])
                backtrack(i + 1, curr)
                curr.pop()
        backtrack(0, [])

    def next(self) -> str:
        res = self.combs[self.ptr]
        self.ptr += 1
        return res

    def hasNext(self) -> bool:
        return self.ptr < len(self.combs)

itr = CombinationIterator("abc", 2)
assert itr.next() == "ab"
assert itr.hasNext() == True
assert itr.next() == "ac"
assert itr.hasNext() == True
assert itr.next() == "bc"
assert itr.hasNext() == False
print("All tests passed successfully.")
