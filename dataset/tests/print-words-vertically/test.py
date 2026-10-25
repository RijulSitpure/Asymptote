class Solution:
    def printVertically(self, s: str) -> list[str]:
        words = s.split()
        max_len = max(len(w) for w in words)
        res = []
        for c in range(max_len):
            col = "".join(w[c] if c < len(w) else " " for w in words)
            res.append(col.rstrip())
        return res

def test():
    sol = Solution()
    assert sol.printVertically("HOW ARE YOU") == ["HAY","ORO","WEU"], "test 1 failed"
    assert sol.printVertically("TO BE OR NOT TO BE") == ["TBONTB","OEROOE","   T"], "test 2 failed"
    print("✓ print-words-vertically passed")

if __name__ == "__main__":
    test()
