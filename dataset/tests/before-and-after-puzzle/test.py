class Solution:
    def beforeAndAfterPuzzles(self, phrases: list[str]) -> list[str]:
        n = len(phrases)
        parsed = []
        for p in phrases:
            words = p.split()
            parsed.append((words[0], words[-1], p))
        
        res = set()
        for i in range(n):
            for j in range(n):
                if i != j and parsed[i][1] == parsed[j][0]:
                    j_tail = phrases[j][len(parsed[j][0]):]
                    res.add(phrases[i] + j_tail)
        return sorted(list(res))

def test():
    sol = Solution()
    p1 = ["writing code","code rocks"]
    assert sol.beforeAndAfterPuzzles(p1) == ["writing code rocks"], "test 1 failed"
    p2 = ["mission statement","a quick bite to eat","a chip off the old block","chocolate bar","mission impossible","a man on a mission","block party","eat my words","bar of soap"]
    expected2 = ["a chip off the old block party","a man on a mission impossible","a man on a mission statement","a quick bite to eat my words","chocolate bar of soap"]
    assert sol.beforeAndAfterPuzzles(p2) == expected2, "test 2 failed"
    print("✓ before-and-after-puzzle passed")

if __name__ == "__main__":
    test()
