from solution import VideoSharingPlatform
p = VideoSharingPlatform()
assert p.upload("123") == 0
assert p.upload("456") == 1
p.remove(0)
assert p.upload("789") == 0
assert p.watch(0, 0, 1) == "78"
p.like(0)
assert p.getLikesAndDislikes(0) == [1, 0]
assert p.getViews(0) == 1
print("All tests passed for design-video-sharing-platform!")
