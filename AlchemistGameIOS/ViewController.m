//
//  ViewController.m
//  AlchemistGameIOS
//
//  Created by Richard Knop on 01/09/2013.
//  Copyright (c) 2013 Richard Knop. All rights reserved.
//

#import "ViewController.h"
#import <AVFoundation/AVFoundation.h>

@interface ViewController ()

@end

@implementation ViewController

@synthesize mainWebVIew;
@synthesize soundtrackPlayer;
@synthesize successPlayer;
@synthesize slidePlayer;

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    mainWebVIew.delegate = self;
    mainWebVIew.scalesPageToFit = YES;
    mainWebVIew.frame=self.view.bounds;
    NSURL *url = [NSURL fileURLWithPath:[[NSBundle mainBundle] pathForResource:@"index" ofType:@"html" inDirectory:@"alchemist-game"]];
    [mainWebVIew loadRequest:[NSURLRequest requestWithURL:url]];
    
    NSString *soundFilePath = [[NSBundle mainBundle] pathForResource:@"soundtrack" ofType:@"wav" inDirectory:@"alchemist-game/sound"];
    NSURL *soundFileURL = [NSURL fileURLWithPath:soundFilePath];
    soundtrackPlayer = [[AVAudioPlayer alloc] initWithContentsOfURL:soundFileURL error:nil];
    soundtrackPlayer.numberOfLoops = -1; //infinite
    
    NSString *soundFilePath2 = [[NSBundle mainBundle] pathForResource:@"success" ofType:@"wav" inDirectory:@"alchemist-game/sound"];
    NSURL *soundFileURL2 = [NSURL fileURLWithPath:soundFilePath2];
    successPlayer = [[AVAudioPlayer alloc] initWithContentsOfURL:soundFileURL2 error:nil];
    
    NSString *soundFilePath3 = [[NSBundle mainBundle] pathForResource:@"slide" ofType:@"wav" inDirectory:@"alchemist-game/sound"];
    NSURL *soundFileURL3 = [NSURL fileURLWithPath:soundFilePath3];
    slidePlayer = [[AVAudioPlayer alloc] initWithContentsOfURL:soundFileURL3 error:nil];
    
	// Do any additional setup after loading the view, typically from a nib.
}

- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType {
    NSString *url = [[request URL] absoluteString];
    
    static NSString *urlPrefix = @"myApp://";
    
    if ([url hasPrefix:urlPrefix]) {
        NSString *paramsString = [url substringFromIndex:[urlPrefix length]];
        NSArray *paramsArray = [paramsString componentsSeparatedByString:@"&"];
        int paramsAmount = [paramsArray count];
        
        for (int i = 0; i < paramsAmount; i++) {
            NSArray *keyValuePair = [[paramsArray objectAtIndex:i] componentsSeparatedByString:@"="];
            NSString *key = [keyValuePair objectAtIndex:0];
            NSString *value = nil;
            if ([keyValuePair count] > 1) {
                value = [keyValuePair objectAtIndex:1];
            }
            
            if (key && [key length] > 0) {
                if (value && [value length] > 0) {
                    if ([value isEqualToString:@"1"]) {
                        [soundtrackPlayer play];
                    }
                    if ([value isEqualToString:@"2"]) {
                        successPlayer.currentTime = 0;
                        [successPlayer play];
                    }
                    if ([value isEqualToString:@"3"]) {
                        slidePlayer.currentTime = 0;
                        [slidePlayer play];
                    }
                }
            }
        }
        
        return NO;
    }
    else {
        return YES;
    }
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
