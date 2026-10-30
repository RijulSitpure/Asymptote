class Solution:
    def smallestNumber(self, pattern: str) -> str:
        ans = []
        stk = []
        for i in range(len(pattern) + 1):
            stk.append(str(i + 1))
            if i == len(pattern) or pattern[i] == 'I':
                while stk:
                    ans.append(stk.pop())
        return "".join(ans)
