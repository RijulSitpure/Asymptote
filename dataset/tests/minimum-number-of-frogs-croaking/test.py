class Solution:
    def minNumberOfFrogs(self, croakOfFrogs: str) -> int:
        c = r = o = a = 0
        frogs = 0
        max_frogs = 0
        for ch in croakOfFrogs:
            if ch == "c":
                c += 1
                frogs += 1
                max_frogs = max(max_frogs, frogs)
            elif ch == "r":
                if c == 0: return -1
                c -= 1
                r += 1
            elif ch == "o":
                if r == 0: return -1
                r -= 1
                o += 1
            elif ch == "a":
                if o == 0: return -1
                o -= 1
                a += 1
            elif ch == "k":
                if a == 0: return -1
                a -= 1
                frogs -= 1
            else:
                return -1
        return max_frogs if frogs == 0 and c == r == o == a == 0 else -1

sol = Solution()
assert sol.minNumberOfFrogs("croakcroak") == 1
assert sol.minNumberOfFrogs("crcoakroak") == 2
assert sol.minNumberOfFrogs("croakcrook") == -1
print("All tests passed successfully.")
