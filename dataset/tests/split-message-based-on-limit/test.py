from solution import Solution
s = Solution()
assert s.splitMessage('this is really a very good world', 15) == ['this is re<1/4>','ally a ver<2/4>','y good wor<3/4>','ld<4/4>']
assert s.splitMessage('short message', 15) == ['short mess<1/2>','age<2/2>']
print('All tests passed for split-message-based-on-limit!')
