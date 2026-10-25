class Solution:
    def destCity(self, paths: list[list[str]]) -> str:
        starts = {u for u, _ in paths}
        for _, v in paths:
            if v not in starts:
                return v
        return ""

def test():
    sol = Solution()
    assert sol.destCity([["London","New York"],["New York","Lima"],["Lima","Sao Paulo"]]) == "Sao Paulo", "test 1 failed"
    assert sol.destCity([["B","C"],["D","B"],["C","A"]]) == "A", "test 2 failed"
    assert sol.destCity([["A","Z"]]) == "Z", "test 3 failed"
    print("✓ destination-city passed")

if __name__ == "__main__":
    test()
