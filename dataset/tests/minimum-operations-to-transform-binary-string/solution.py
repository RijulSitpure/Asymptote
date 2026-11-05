def minOpsToTransformBinaryString(s: str, t: str) -> int:
    flips = 0
    for i in range(len(s) - 1, -1, -1):
        cur_bit = s[i] if flips % 2 == 0 else ('1' if s[i] == '0' else '0')
        if cur_bit != t[i]:
            flips += 1
    return flips