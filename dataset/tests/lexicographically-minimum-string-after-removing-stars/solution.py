class Solution:
    def clearStars(self, s: str) -> str:
        stacks = [[] for _ in range(26)]
        removed = [False] * len(s)
        for i, ch in enumerate(s):
            if ch == '*':
                for c in range(26):
                    if stacks[c]:
                        removed[stacks[c].pop()] = True
                        break
            else:
                stacks[ord(ch) - ord('a')].append(i)
        
        return "".join(ch for i, ch in enumerate(s) if not removed[i] and ch != '*')