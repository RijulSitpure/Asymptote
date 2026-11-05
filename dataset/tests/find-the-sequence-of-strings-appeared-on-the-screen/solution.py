class Solution:
    def stringSequence(self, target: str) -> list[str]:
        ans = []
        curr = ""
        for ch in target:
            # Button 1 appends 'a'
            curr += 'a'
            ans.append(curr)
            # Button 2 cycles up to ch
            for code in range(ord('b'), ord(ch) + 1):
                curr = curr[:-1] + chr(code)
                ans.append(curr)
        return ans
