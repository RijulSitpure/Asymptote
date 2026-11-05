import json

inserts = '''
INSERT INTO Tweets VALUES 
(1, 'Hello world!'),
(2, 'Too many mentions: @user1 @user2 @user3 @user4'),
(3, 'Too many tags: #tag1 #tag2 #tag3 #tag4');
'''
print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
