updateUserPoints = function(userId, points) {
    Meteor.users.update(userId, { $inc: { 'profile.points': points } }, function(error) {
        if (error) console.log(error);
    });
}
