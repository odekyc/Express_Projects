var express = require('express');
var router = express.Router();
Category=require('../models/Category.js');
Article= require('../models/article.js');
/* GET home page. */
router.get('/', function(req, res, next) {
   Article.getArticles(function(err, articles){
   		if(err){
   			res.send(err);
   		}else{
   			res.render('articles',{
   				title: 'All Articles',
   				articles, articles
   			});
   		}
   });
});

router.get('/show/:id', function(req, res, next) {
  Article.getArticleById([req.params.id], function(err, article){
    if(err){
      res.send(err);
    }else{
      res.render('article', {
        article: article
      });
    }
  });
  
});

router.post('/add', function(req, res){
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('author', 'Author field is required').notEmpty();
    
    var errors= req.validationErrors();

    if(errors){
      Category.getCategories(function(err, categories){
        res.render('add_article',{
        errors: errors,
        title: "Add Article",
        categories: categories
      });
      });
      
    }else{
      var article= new Article();
      article.title=req.body.title;
      article.subtitle=req.body.subtitle;
      article.category=req.body.category;
      article.body=req.body.body;
      article.author=req.body.author;

      Article.addArticle(article, function(err, article){
             if(err){
      res.send(err);
        }else{
             req.flash('success', 'Article Saved');
             res.redirect('/manage/articles');
    }
      });
    }
});

router.post('/edit/:id', function(req, res){
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('author', 'Author field is required').notEmpty();
    
    var errors= req.validationErrors();

    if(errors){
      Category.getCategories(function(err, categories){
        res.render('add_article',{
        errors: errors,
        title: "Add Article",
        categories: categories
      });
      });
      
    }else{
      var article= new Article();
        var query={_id: [req.params.id]};
        var update= {title: req.body.title, 
          subtitle: req.body.subtitle,
           category: req.body.category,
            author: req.body.author
          };
          console.log(update);
          console.log(req.body);
        Article.updateArticle(query, update, {}, function(err, article){
            if(err){
                res.send(err);
            }else{
                console.log(article);
                req.flash('success', 'Article Updated');
                res.location('/manage/articles');
                res.redirect('/manage/articles');
            }
        });
    }
});

router.get('/category/:category_id', function(req, res, next) {
  Category.getCategoryById(req.params.category_id,function(err, category){
    if(err){
      console.log(err);
      res.send(err);
    }else{

         Article.getArticles({category: category.title }, function(err, articles){
            if(err){
              res.send(err);
            }else{
               console.log(category.title);
               res.render('articles',{
              articles: articles
             });
            }
         });
    }
  });
});

router.delete('/delete/:id', function(req, res){
    var query={_id: [req.params.id]};
    Article.remove(query, function(err){
        if(err){
            res.send(err);
        }else{
            res.status(204).send();
        }
    });
});


module.exports = router;