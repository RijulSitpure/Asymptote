from solution import Solution
s = Solution()
assert s.decodeMessage('the quick brown fox jumps over the lazy dog', 'vkbs bs t suepuv') == 'this is a secret'
assert s.decodeMessage('eljux hpwn yr dgt qkviszcf mabo', 'zwx hnfx lqantp mnoeius ycgk vcnjrdb') == 'the five boxing wizards jump quickly'
print("All tests passed for decode-the-message!")
