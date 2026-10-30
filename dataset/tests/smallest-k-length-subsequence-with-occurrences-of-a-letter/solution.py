class Solution:
    def smallestSubsequence(self, s: str, k: int, letter: str, repetition: int) -> str:
        rem_letters = s.count(letter)
        stack = []
        n = len(s)
        for i, c in enumerate(s):
            while stack and stack[-1] > c and (len(stack) + (n - i) > k):
                if stack[-1] == letter:
                    if rem_letters <= repetition:
                        break
                    repetition += 1
                stack.pop()
            if len(stack) < k:
                if c == letter:
                    stack.append(c)
                    repetition -= 1
                elif k - len(stack) > repetition:
                    stack.append(c)
            if c == letter:
                rem_letters -= 1
        return ''.join(stack)
