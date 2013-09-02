//
//  ViewController.h
//  AlchemistGameIOS
//
//  Created by Richard Knop on 01/09/2013.
//  Copyright (c) 2013 Richard Knop. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>

@interface ViewController : UIViewController <UIWebViewDelegate>

@property (weak, nonatomic) IBOutlet UIWebView *mainWebVIew;
@property (retain, atomic) AVAudioPlayer *soundtrackPlayer;
@property (retain, atomic) AVAudioPlayer *successPlayer;
@property (retain, atomic) AVAudioPlayer *slidePlayer;

@end
