$(document).ready(function() {
    $('.UnLikeLink').live('click', function() {
        var postParent = $(this).parents(".storyInnerContent").get(0);
        //Get post id
        // var shareblock = $(postParent).find(".share_action_link").attr("href");
        // var pattern = /5B1%5D=[0-9]{4,}/i;
        // var pattern2 = /[0-9]{4,}/i;
        // var post_id = pattern.exec(shareblock);
        // post_id = pattern2.exec(post_id);

        //Get Poster_id and Poster_name
        var poster = $(document).find(".fbxWelcomeBoxName").get(0);
        var poster_name = $(poster).html();
        var poster_id = $(poster).attr('data-gt');
        pattern = /[0-9]{8,}/i;
        poster_id = parseInt(pattern.exec(poster_id)[0]);

        //Get Poster_id
        var owner = $(postParent).find(".actorDescription").children();
        if (owner.length == 0) {
            owner = $(postParent).find(".uiStreamMessage.uiStreamHeadline.uiStreamPassive").children();
        }
        var owner_id = owner.attr('data-hovercard');
        var owner_name = owner.html();
        
        pattern = /[0-9]{8,}/i;
        owner_id = parseInt(pattern.exec(owner_id)[0]);


        //get time
        var timeblock = $(postParent).find(".uiStreamFooter").find(".uiStreamSource");
        var poster_time = timeblock.find("abbr").attr('data-utime');

        //get post_id;
        var post_id = timeblock.find("a").attr('href');
        pattern = /[0-9]{8,}/i;
        post_id = parseInt(pattern.exec(post_id)[0]);


        //get message type and text
        // 0: text; 1: link; 2: photo; 3: others
        var type = 3; 
        var message = "";
        var links;
        var privacy = "true";
        // If is test
        var text = $(postParent).find(".userContent")[0];
        if (text) {
            type = 0;
            message = $(text).text();
        } else {
            //innerHTML or innerText???
            text = $(postParent).find(".uiStreamMessage.uiStreamHeadline.uiStreamPassive")[0].innerText;
            message = text;
        }


        //get attachments
        //get photos
        var attachments = $(postParent).find(".mvm.uiStreamAttachments.fbMainStreamAttachment")[0]; 
        var photos = $(attachments).find(".uiScaledImageContainer.photoWrap");
        if (photos.length == 0) {
            photos = $(attachments).find(".uiPhotoThumb.photoRedesignAspect");
            if (photos.length == 0) {
                photos = $(attachments).find(".uiPhotoThumb.photoRedesignCover");
            }
        }
        if (photos.length > 0) {
            var photoLinks = new Array();
            photos.each(function() {
                photoLinks.push($(this).find('img').attr('src'));
            });
            if (photoLinks.length > 0) {
                type = 2;
                links = photoLinks;
            }
        }

        //Might be a link
        if (type != 2) {
            var shares = $(attachments).find(".shareRedesign");
            if (shares.length > 0) {
                var shareLink = shares.find(".shareText").attr('href');
                if (shareLink.length > 0) {
                    links = new Array();
                    links.push(shareLink);
                    type = 1;
                }
            }
        }

        var typeString = 'other';
        switch (type) {
            case 1:
                typeString = 'text';
                break;
            case 2:
                typeString = 'link';
                break;
            case 3:
                typeStrinig = 'photo';
                break;
        }


        //Privacy


        var postPrivacy = $(postParent).find(".uiStreamPrivacy").attr('aria-label');
        var privacyPattern = /public/i; 
        privacy = (privacyPattern.exec(postPrivacy) != null) ? true : false;


        console.log(post_id);

        console.log(poster_id);
        console.log(poster_name);

        console.log(owner_id);
        console.log(owner_name);

        console.log(poster_time);

        console.log(message);
        console.log(links);
        console.log(type);

        console.log(privacy);

        var data = {
            post_id: post_id,
            poster_id: poster_id,
            poster_username: poster_name,
            owner_id: owner_id,
            owner_name: owner_name,
            time: poster_time,
            type: typeString,
            message: message,
            urls: links,
            private: privacy,
        }


        // Post
        if (post_id) {
            $.post("http://0.0.0.0:5000/post", data, function(data) { console.log(data); }, "json");
        }
    });
});