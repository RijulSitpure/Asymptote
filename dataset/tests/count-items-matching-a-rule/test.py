class Solution:
    def countMatches(self, items: list[list[str]], ruleKey: str, ruleValue: str) -> int:
        idx = 0 if ruleKey == "type" else (1 if ruleKey == "color" else 2)
        return sum(1 for item in items if item[idx] == ruleValue)

def test():
    sol = Solution()
    items1 = [["phone","blue","pixel"],["computer","silver","lenovo"],["phone","gold","iphone"]]
    assert sol.countMatches(items1, "color", "silver") == 1
    items2 = [["phone","blue","pixel"],["computer","silver","phone"],["phone","gold","iphone"]]
    assert sol.countMatches(items2, "type", "phone") == 2

    print("✓ count-items-matching-a-rule passed")

if __name__ == '__main__':
    test()
