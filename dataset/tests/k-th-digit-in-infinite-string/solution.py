def findKthDigit(k: int) -> int:
    digit_len = 1
    count = 9
    start = 1
    while k > digit_len * count:
        k -= digit_len * count
        digit_len += 1
        count *= 10
        start *= 10
    num = start + (k - 1) // digit_len
    idx = (k - 1) % digit_len
    return int(str(num)[idx])