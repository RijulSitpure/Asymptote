class Solution:
    def differByOne(self, dict: list[str]) -> bool:
        m = len(dict[0])
        for j in range(m):
            seen = set()
            for word in dict:
                pattern = word[:j] + "*" + word[j + 1:]
                if pattern in seen: return True
                seen.add(pattern)
        return False

sol = Solution()
assert sol.differByOne(["abcd","acbd","aacd"]) == True
assert sol.differByOne(["ab","cd","yz"]) == False
print("All tests passed successfully.")
